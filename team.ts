import patrickPhoto from '../assets/team/patrick-nhim.jpg';
import brettPhoto from '../assets/team/brett-david.jpg';
import jennyPhoto from '../assets/team/jenny-saffin.jpg';
import lukePhoto from '../assets/team/luke-whittaker.jpg';
import marissaPhoto from '../assets/team/marissa-bowell.jpg';

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo: string;
}

// The three landlords will most likely deal with day-to-day.
export const PROPERTY_MANAGERS: TeamMember[] = [
  { name: 'Jenny Saffin', role: 'Property Manager', initials: 'JS', photo: jennyPhoto },
  { name: 'Luke Whittaker', role: 'Property Manager / Sales Agent', initials: 'LW', photo: lukePhoto },
  { name: 'Marissa Bowell', role: 'Property Manager', initials: 'MB', photo: marissaPhoto },
];

// Leadership — shown smaller, below the property managers, so the founder
// story doesn't dominate this landlord-acquisition page.
export const LEADERSHIP: TeamMember[] = [
  { name: 'Brett David', role: 'Region Manager', initials: 'BD', photo: brettPhoto },
  { name: 'Patrick Nhim', role: 'Director', initials: 'PN', photo: patrickPhoto },
];
