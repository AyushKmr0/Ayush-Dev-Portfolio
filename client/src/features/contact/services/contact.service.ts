import { apiClient } from "../../../services/api/apiClient";
import type { ContactFormValues } from "../schemas/contact.schema";

export async function sendContactMessage(
  payload: ContactFormValues,
): Promise<void> {
  await apiClient.post("/contact", payload);
}