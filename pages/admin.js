import DashboardAdmin from "@/components/DashBoard_admin/DashBoard_Admin";
import LayoutAdmin from "@/components/DashBoard_admin/layout/Layout_admin";

export default function Admin() {
   return (
     <LayoutAdmin title='Home Layout'>
         <DashboardAdmin />
     </LayoutAdmin>
   )
 }