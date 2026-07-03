import GenericCRUD from '../../components/admin/GenericCRUD';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea', required: true },
  { name: 'icon', label: 'Icon (e.g. smartphone, globe, code)', required: true },
  { name: 'features', label: 'Features (comma-separated)', type: 'array' },
  { name: 'order', label: 'Order', type: 'number', default: 0 },
  { name: 'isActive', label: 'Active', type: 'checkbox', default: true, checkLabel: 'Visible on website' },
];
const columns = [
  { key: 'title', label: 'Title', className: 'text-white font-medium' },
  { key: 'icon', label: 'Icon' },
  { key: 'order', label: 'Order', className: 'text-gray-400' },
  { key: 'isActive', label: 'Active', badge: v => v ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400' },
];

export default function AdminServices() {
  return <GenericCRUD title="Services" endpoint="/services" fields={fields} columns={columns} />;
}
