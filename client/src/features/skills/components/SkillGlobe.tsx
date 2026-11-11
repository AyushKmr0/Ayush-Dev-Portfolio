import { useCallback, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BackSide, Vector3 } from "three";
import type { Skill } from "../types/skills.types";
import SkillNode from "./SkillNode";

interface SkillGlobeProps {
	skills: Skill[];
}

interface GlobeSceneProps extends SkillGlobeProps {
	labelElements: MutableRefObject<Array<HTMLDivElement | null>>;
}

// Tune globe diameter here. The mobile value is used below 640px.
const MOBILE_GLOBE_RADIUS = 1.05;
const DESKTOP_GLOBE_RADIUS = 1.2;
const NODE_ORBIT_RADIUS_FACTOR = 1.7;
const NODE_HORIZONTAL_OFFSET = 0.07;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function GlobeScene({ skills, labelElements }: GlobeSceneProps) {
	const { size } = useThree();
	const sphereRadius =
		size.width < 640 ? MOBILE_GLOBE_RADIUS : DESKTOP_GLOBE_RADIUS;
	const cameraPosition = useMemo(() => new Vector3(), []);
	const markerPosition = useMemo(() => new Vector3(), []);
	const cameraDirection = useMemo(() => new Vector3(), []);
	const normalDirection = useMemo(() => new Vector3(), []);
	const projectedPosition = useMemo(() => new Vector3(), []);

	const positions = useMemo(() => {
		const count = skills.length;
		if (count === 1)
			return [[0, 0, sphereRadius * 1.12] as [number, number, number]];

		return skills.map((_, index) => {
			// Spread nodes over the whole sphere so rotation never leaves it empty.
			const y = 1 - ((index + 0.5) / count) * 2;
			const ringRadius = Math.sqrt(1 - y * y);
			const theta = GOLDEN_ANGLE * index;

			return [
				Math.cos(theta) * ringRadius * sphereRadius * NODE_ORBIT_RADIUS_FACTOR,
				y * sphereRadius * NODE_ORBIT_RADIUS_FACTOR,
				Math.sin(theta) * ringRadius * sphereRadius * NODE_ORBIT_RADIUS_FACTOR,
			] as [number, number, number];
		});
	}, [skills, sphereRadius]);

	useFrame(({ camera }) => {
		camera.getWorldPosition(cameraPosition);

		positions.forEach((position, index) => {
			const element = labelElements.current[index];
			if (!element) return;

			markerPosition.set(...position);
			normalDirection.copy(markerPosition).normalize();
			cameraDirection
				.copy(cameraPosition)
				.sub(markerPosition)
				.normalize();
			const facingAmount = normalDirection.dot(cameraDirection);
			const isFacingCamera = facingAmount > 0;
			projectedPosition.copy(markerPosition).project(camera);
			const isInView =
				projectedPosition.z > -1 && projectedPosition.z < 1;
			const x =
				(projectedPosition.x * 0.5 + 0.5 + NODE_HORIZONTAL_OFFSET) *
				size.width;
			const y = (-projectedPosition.y * 0.5 + 0.5) * size.height;

			element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(var(--node-scale, 1))`;
			element.style.opacity = isInView
				? isFacingCamera
					? "1"
					: "0.52"
				: "0";
			element.style.zIndex = isFacingCamera ? "2" : "0";
			element.style.pointerEvents =
				isFacingCamera && isInView ? "auto" : "none";
		});
	});

	return (
		<>
			<ambientLight intensity={0.85} />
			<pointLight
				position={[2.5, 2.5, 4]}
				intensity={2.4}
				color="#f97316"
			/>
			<pointLight
				position={[-3, -2, -3]}
				intensity={1.3}
				color="#2563eb"
			/>

			<mesh scale={1.1}>
				<sphereGeometry args={[sphereRadius, 32, 32]} />
				<meshBasicMaterial
					color="#fb923c"
					side={BackSide}
					transparent
					opacity={0.08}
					depthWrite={false}
				/>
			</mesh>

			<mesh>
				<sphereGeometry args={[sphereRadius * 0.985, 32, 32]} />
				<meshBasicMaterial
					color="#bfdbfe"
					transparent
					opacity={0.16}
					depthWrite={false}
				/>
			</mesh>

			<mesh>
				<icosahedronGeometry args={[sphereRadius, 1]} />
				<meshBasicMaterial
					color="#155dfc"
					wireframe
					transparent
					opacity={0.08}
					depthWrite={false}
					depthTest={false}
				/>
			</mesh>

			<mesh scale={1.2}>
				<icosahedronGeometry args={[sphereRadius, 1]} />
				<meshBasicMaterial
					color="#ea580c"
					wireframe
					transparent
					opacity={0.42}
					depthWrite={false}
					depthTest={false}
				/>
			</mesh>

			<OrbitControls
				enableZoom={false}
				enablePan={false}
				enableRotate
				autoRotate
				autoRotateSpeed={6}
				minPolarAngle={Math.PI * 0.2}
				maxPolarAngle={Math.PI * 0.8}
			/>
		</>
	);
}

const SkillGlobe = ({ skills }: SkillGlobeProps) => {
	const labelElements = useRef<Array<HTMLDivElement | null>>([]);
	const registerLabelElement = useCallback(
		(index: number, element: HTMLDivElement | null) => {
			labelElements.current[index] = element;
		},
		[],
	);

	return (
		<div className="relative mx-auto h-full w-full">
			<Canvas
				camera={{ position: [0, 0, 6], fov: 46 }}
				dpr={[1, 2]}
				gl={{ antialias: true, alpha: true }}
				onCreated={({ gl }) => {
					gl.domElement.style.margin = "auto";
				}}>
				<GlobeScene skills={skills} labelElements={labelElements} />
			</Canvas>
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{skills.map((skill, index) => (
					<SkillNode
						key={skill.id}
						skill={skill}
						index={index}
						registerElement={registerLabelElement}
					/>
				))}
			</div>
		</div>
	);
};

export default SkillGlobe;
