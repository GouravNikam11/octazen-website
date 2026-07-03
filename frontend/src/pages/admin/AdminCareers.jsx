import GenericCRUD from '../../components/admin/GenericCRUD';

const TYPES = ['full-time','part-time','contract','internship','remote'];
const fields = [
  { name: 'title', label: 'Job Title', required: true },
  { name: 'department', label: 'Department', required: true },
  { name: 'type', label: 'Job Type', type: 'select', options: TYPES, default: 'full-time' },
  { name: 'experience', label: 'Experience Required', placeholder: '2-4 years' },
  { name: 'location', label: 'Location', default: 'Kolhapur, Maharashtra, India' },
  { name: 'description', label: 'Job Description', type: 'textarea', required: true },
  { name: 'requirements', label: 'Requirements (comma-separated)', type: 'array' },
  { name: 'responsibilities', label: 'Responsibilities (comma-separated)', type: 'array' },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true, checkLabel: 'Visible on careers page' },
];
const columns = [
  { key: 'title', label: 'Title', className: 'text-white font-medium' },
  { key: 'department', label: 'Department', className: 'text-gray-400' },
  { key: 'type', label: 'Type', badge: () => 'bg-blue-500/10 text-blue-400' },
  { key: 'experience', label: 'Experience', className: 'text-gray-500' },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminCareers() {
  return <GenericCRUD title="Career Opening" endpoint="/careers" fields={fields} columns={columns} />;
}
