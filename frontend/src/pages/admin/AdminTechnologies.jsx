import GenericCRUD from '../../components/admin/GenericCRUD';

const CATS = ['frontend','backend','mobile','database','cloud','devops','tools','ai'];
const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'category', label: 'Category', type: 'select', options: CATS, default: 'frontend' },
  { name: 'icon', label: 'Icon key (e.g. react, nodejs)', default: '' },
  { name: 'proficiency', label: 'Proficiency %', type: 'number', min: 1, max: 100, default: 85 },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true, checkLabel: 'Visible on website' },
];
const columns = [
  { key: 'name', label: 'Name', className: 'text-white font-medium' },
  { key: 'category', label: 'Category', badge: () => 'bg-blue-500/10 text-blue-400' },
  { key: 'proficiency', label: 'Proficiency', render: v => `${v}%` },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminTechnologies() {
  return <GenericCRUD title="Technologies" endpoint="/technologies" fields={fields} columns={columns} />;
}
