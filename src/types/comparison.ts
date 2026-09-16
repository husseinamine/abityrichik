export type DisciplineCategory =
  | 'programming'          // 💻 Программирование
  | 'math'                 // 🧮 Математика
  | 'algorithms'           // 🧠 Алгоритмы и структуры данных
  | 'data_science'         // 📊 Анализ данных и статистика
  | 'ai_ml'                // 🤖 Машинное обучение / AI
  | 'databases'            // 🗄 Базы данных
  | 'software_eng'         // 🌐 Веб и программная инженерия
  | 'systems'              // ⚙️ Компьютерные системы и сети
  | 'physics_science'      // 🔬 Физика и естественные науки
  | 'english'              // 🌍 Английский язык
  | 'pe'                   // 🏃 Физическая культура
  | 'humanities'           // 📚 Гуманитарные дисциплины
  | 'projects'             // 🎯 Проектная деятельность
  | 'business_management'; // 💼 Экономика и менеджмент

export interface DisciplineCategoryMeta {
  id: DisciplineCategory;
  name: string;
  icon: string;
  shortDescription: string;
  accentColor: string; // Hex or CSS color
}

export interface Discipline {
  id: string;
  name: string;                 // Реальное название предмета из учебного плана
  normalizedCategory: DisciplineCategory;
  course: 1 | 2 | 3 | 4;       // 1 - 4 курс
  semester: number;             // 1 - 8 семестр
  credits: number;              // Зачётные единицы (З.Е.)
  academicHours: number;        // Академические часы
  isElective?: boolean;         // По выбору
}

export interface StudyPlan {
  programId: string;
  programTitle: string;
  university: string;
  totalCredits: number;         // Обычно 240 З.Е.
  totalAcademicHours: number;   // Обычно ~8640 часов
  disciplines: Discipline[];
}

export interface CategorySummary {
  category: DisciplineCategory;
  meta: DisciplineCategoryMeta;
  credits: number;
  percentage: number;           // (credits / totalCredits) * 100
  academicHours: number;
  disciplines: Discipline[];
}

export interface CourseSummary {
  course: 1 | 2 | 3 | 4;
  totalCredits: number;
  disciplines: Discipline[];
}

export interface ProgramCurriculumStats {
  programId: string;
  totalCredits: number;
  totalHours: number;
  categories: Record<DisciplineCategory, CategorySummary>;
  courses: Record<1 | 2 | 3 | 4, CourseSummary>;
}

export interface ComparisonInsight {
  type: 'leader' | 'contrast' | 'similarity' | 'course_progression';
  title: string;
  description: string;
  category?: DisciplineCategory;
  icon: string;
}
