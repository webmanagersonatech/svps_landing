import type { ComponentType } from "react";
import {
  Info, Users, BookOpen, MessageCircle, Shield,
  Building, Activity, Bus, Heart, Coffee,
  Trophy, Palette, Building2, Monitor, Award,
} from "lucide-react";

/**
 * Single source of truth for the About / Academics / Infrastructure menus.
 * Used by BOTH the Navbar dropdowns and the section index pages
 * (/about-us, /academics, /infrastructure-facilities), so they never drift apart.
 */
export interface MenuItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export const aboutLinks: MenuItem[] = [
  { name: "Heritage", href: "/about-us/heritage", icon: Info, description: "Our legacy and history" },
  { name: "Vision & Mission", href: "/about-us/vision-and-mission", icon: Info, description: "Our goals and purpose" },
  { name: "Management", href: "/about-us/management-team-committee", icon: Users, description: "Leadership team" },
  { name: "Chairman's Books", href: "/about-us/chairman-books", icon: BookOpen, description: "Publications by chairman" },
  { name: "Principal Message", href: "/about-us/principal-message", icon: MessageCircle, description: "Message from principal" },
  { name: "Rules & Regulations", href: "/about-us/rules-and-regulations", icon: Shield, description: "School policies" },
];

export const academicsLinks: MenuItem[] = [
  { name: "Curriculum & Pedagogical Processes", href: "/academics/curriculum-and-pedagogical-processes", icon: BookOpen, description: "Teaching framework" },
  { name: "Methodology", href: "/academics/methodology", icon: BookOpen, description: "Learning approach" },
  { name: "Creative Learning", href: "/academics/creative-learning", icon: Palette, description: "Imagination in action" },
  { name: "Academic Excellence", href: "/academics/academic-excellence", icon: Trophy, description: "Strong academic foundation" },
  { name: "All Round Development", href: "/academics/all-round-development", icon: Award, description: "Holistic growth" },
  { name: "Teacher Training", href: "/academics/teacher-training-programme-workshops", icon: Users, description: "Faculty development" },
];

export const infrastructureLinks: MenuItem[] = [
  { name: "Smart Class Rooms", href: "/infrastructure-facilities/classrooms", icon: Building, description: "Modern learning spaces" },
  { name: "Sports & Games", href: "/infrastructure-facilities/indoor-outdoor-and-traditional-games", icon: Activity, description: "Sports & recreation" },
  { name: "Transport", href: "/infrastructure-facilities/transport-facilities", icon: Bus, description: "Safe travel" },
  { name: "Medical", href: "/infrastructure-facilities/medical-facilities", icon: Heart, description: "Health support" },
  { name: "Library", href: "/infrastructure-facilities/library", icon: BookOpen, description: "Knowledge resources" },
  { name: "Auditorium", href: "/infrastructure-facilities/auditorium", icon: Building2, description: "Spacious space for events and activities" },
  { name: "Computer Lab", href: "/infrastructure-facilities/computer-lab", icon: Monitor, description: "Technology-enabled learning" },
  { name: "Dining", href: "/infrastructure-facilities/pantry-and-dining", icon: Coffee, description: "Dining area" },
];
