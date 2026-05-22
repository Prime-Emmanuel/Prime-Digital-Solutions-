export interface ProjectUpdate {
  id: string;
  date: string;
  text: string;
}

export interface ProjectData {
  id: string; // The access code
  clientName: string;
  projectName: string;
  deadline: string;
  stage: string;
  progress: number; // 0-100
  screenshots: string[]; // List of image URLs
  updates: ProjectUpdate[];
  budget?: string;
  priority?: 'Low' | 'Medium' | 'High';
  projectManager?: string;
  contractUrl?: string;
  contractSigned?: boolean;
  contractSignedBy?: string;
  contractSignedAt?: string;
}

const STORAGE_KEY = 'prime_digital_projects';

export const getProjects = (): ProjectData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as ProjectData[];
  } catch (e) {
    return [];
  }
};

export const saveProjects = (projects: ProjectData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const getProjectByCode = (code: string): ProjectData | null => {
  const projects = getProjects();
  return projects.find((p) => p.id === code) || null;
};
