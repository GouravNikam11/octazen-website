import GenericCRUD from '../../components/admin/GenericCRUD';

const fields = [
  { name: 'label', label: 'Label', required: true, placeholder: 'Projects Delivered' },
  { name: 'value', label: 'Value (number)', type: 'number', required: true },
  { name: 'suffix', label: 'Suffix', default: '+', placeholder: '+, %, k' },
  { name: 'icon', label: 'Icon', default: 'check-circle' },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true },
];
const columns = [
  { key: 'label', label: 'Label', className: 'text-white font-medium' },
  { key: 'value', label: 'Value', className: 'text-blue-400 font-bold' },
  { key: 'suffix', label: 'Suffix', className: 'text-gray-400' },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminStats() {
  return <GenericCRUD title="Statistic" endpoint="/stats" fields={fields} columns={columns} />;
}
