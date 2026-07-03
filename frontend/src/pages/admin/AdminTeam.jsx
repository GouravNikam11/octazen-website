import GenericCRUD from '../../components/admin/GenericCRUD';

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'designation', label: 'Designation', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'skills', label: 'Skills (comma-separated)', type: 'array' },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true, checkLabel: 'Visible on website' },
];
const columns = [
  { key: 'name', label: 'Name', className: 'text-white font-medium' },
  { key: 'designation', label: 'Role', className: 'text-gray-400' },
  { key: 'order', label: 'Order', className: 'text-gray-500' },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminTeam() {
  return <GenericCRUD title="Team Member" endpoint="/team" fields={fields} columns={columns} />;
}
