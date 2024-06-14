"use client"
import withAuth from "@/app/lib/withAuth";
import Settings from "@/app/ui/settings/settings-page";

 const SettingsPage =() => {
    return (
        <Settings />
    )
}
export default withAuth(SettingsPage);