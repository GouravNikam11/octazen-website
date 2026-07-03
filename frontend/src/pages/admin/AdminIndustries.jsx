import GenericCRUD from '../../components/admin/GenericCRUD';

const fields = [
  { name: 'name', label: 'Industry Name', required: true },
  { name: 'icon', label: 'Icon (e.g. heart-pulse, banknote)', required: true },
  { name: 'description', label: 'Short Description', type: 'textarea' },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true },
];
const columns = [
  { key: 'name', label: 'Industry', className: 'text-white font-medium' },
  { key: 'icon', label: 'Icon', className: 'text-gray-400' },
  { key: 'order', label: 'Order', className: 'text-gray-500' },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminIndustries() {
  return <GenericCRUD title="Industry" endpoint="/industries" fields={fields} columns={columns} />;
}
