import api from "./axios";
import { Material } from "./grn/add/page";
export const getMaterials = (): Promise<Material[]> => api.get("/materials");