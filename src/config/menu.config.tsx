import {
    Map,
    MapPinned,
    GitBranch,
    Building2,
    Clock,
    Store,
    UsersIcon,
    LayoutDashboard,
    UserCog,
    Key,
} from 'lucide-react';
// import Overview from '@/pages/dashboard/Overview';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import SuperAdminLayout from '@/layout/SuperAdminLayout';
import type { ReactNode } from 'react';
import { ProtectedAuth } from '@/app/router/ProtectedAuth';
import AreasView from '@/pages/dashboard/area/AreasView';
import CreateArea from '@/pages/dashboard/area/CreateArea';
import UpdateArea from '@/pages/dashboard/area/UpdateArea';
import CreateRegion from '@/pages/dashboard/regions/CreateRegion';
import UpdateRegion from '@/pages/dashboard/regions/UpdateRegion';
import SubRegionsView from '@/pages/dashboard/sub-regions/SubRegionsView';
import CreateSubRegion from '@/pages/dashboard/sub-regions/CreateSubRegion';
import UpdateSubRegion from '@/pages/dashboard/sub-regions/UpdateSubRegion';
import CreateMall from '@/pages/dashboard/malls/CreateMall';
import UpdateMall from '@/pages/dashboard/malls/UpdateMall';
import MallsView from '@/pages/dashboard/malls/MallsView';
import CreateShifts from '@/pages/dashboard/shifts/CreateShifts';
import BoothsView from '@/pages/dashboard/booths/BoothsView';
import CreateBooth from '@/pages/dashboard/booths/CreateBooth';
import UpdateBooth from '@/pages/dashboard/booths/UpdateBooth';
import ShiftsView from '@/pages/dashboard/shifts/ShiftsView';
import UpdateShift from '@/pages/dashboard/shifts/UpdateShift';
import { ForgetPasswordPage } from '@/pages/auth/ForgetPasswordPage';
import { Navigate } from 'react-router-dom';
import CreateDashboardUser from '@/pages/dashboard/dashboard-users/CreateDashboardUser';
import UpdateDashboardUser from '@/pages/dashboard/dashboard-users/UpdateDashboardUser';
import ViewMobileUsers from '@/pages/dashboard/mobile-users/ViewMobileUsers';
import CreateMobileUser from '@/pages/dashboard/mobile-users/CreateMobileUser';
import UpdateMobileUser from '@/pages/dashboard/mobile-users/UpdateMobileUser';
import ViewRegions from '@/pages/dashboard/regions/ViewRegions';
import DashboardUsersView from '@/pages/dashboard/dashboard-users/DashboardUsersView';
import ViewPermissions from '@/pages/dashboard/permissions/VeiwPermissions';
import CreatePermissions from '@/pages/dashboard/permissions/CreatePermissions';
import UpdatePermissions from '@/pages/dashboard/permissions/UpdatePermissions';

interface HiddenRoute {
    path: string;
    element: ReactNode;
    layout?: 'superAdmin' | 'none';
}

interface ModuleItem {
    id?: string;
    icon: any;
    label: string;
    path?: string;
    badge?: string | null;
    element?: ReactNode; // 💡 Component to render in router
    children?: ModuleItem[];
}

interface ModuleSection {
    section: string;
    items: ModuleItem[];
}

// 💡 Central sidebar + routes config
export const modules: ModuleSection[] = [
    {
        section: 'sidebar.main',
        items: [
            {
                id: "organization",
                icon: Map,
                label: "sidebar.organization",
                children: [
                    {
                        icon: Map,
                        label: 'sidebar.areas',
                        path: '/areas',
                        element: <AreasView />,
                    },
                    {
                        icon: MapPinned,
                        label: 'sidebar.regions',
                        path: '/regions',
                        element: <ViewRegions />,
                    },
                    {
                        icon: GitBranch,
                        label: 'sidebar.subRegions',
                        path: '/sub-regions',
                        element: <SubRegionsView />,
                    },
                    {
                        icon: Building2,
                        label: 'sidebar.malls',
                        path: '/malls',
                        element: <MallsView />,
                    },
                    {
                        icon: Clock,
                        label: 'sidebar.shifts',
                        path: '/shifts',
                        element: <ShiftsView />,
                    },
                    {
                        icon: Store,
                        label: 'sidebar.booths',
                        path: '/booths',
                        element: <BoothsView />,
                    },
                ]
            },
            {
                id: "users",
                icon: UsersIcon,
                label: "sidebar.hrModules",
                children: [
                    {
                        icon: LayoutDashboard,
                        label: 'sidebar.dashboardUsers',
                        path: '/dashboard-users',
                        element: <DashboardUsersView />,
                    },
                    {
                        icon: UserCog,
                        label: 'sidebar.mobileUsers',
                        path: '/mobile-users',
                        element: <ViewMobileUsers />,
                    },
                    {
                        icon: Key,
                        label: 'sidebar.profilePermissions',
                        path: '/roles',
                        element: <ViewPermissions />,
                    },
                ]
            },
            // {
            //     id: "roles",
            //     icon: Key,
            //     label: "sidebar.roles",
            //     children: [
            //         {
            //             icon: UserLockIcon,
            //             label: 'sidebar.view',
            //             path: '/roles',
            //             element: <ViewPermissions />,
            //         },
            //     ]
            // },
        ],
    },
];


export const hiddenRoutes: HiddenRoute[] = [
    {
        path: '/areas/create',
        element: <CreateArea />,
    },
    {
        path: '/areas/:id/edit',
        element: <UpdateArea />,
    },
    {
        path: '/regions/create',
        element: <CreateRegion />,
    },
    {
        path: '/regions/:id/edit',
        element: <UpdateRegion />,
    },
    {
        path: '/sub-regions/create',
        element: <CreateSubRegion />,
    },
    {
        path: '/sub-regions/:id/edit',
        element: <UpdateSubRegion />,
    },
    {
        path: '/malls/create',
        element: <CreateMall />,
    },
    {
        path: '/malls/:id/edit',
        element: <UpdateMall />,
    },
    {
        path: '/shifts/create',
        element: <CreateShifts />,
    },
    {
        path: '/shifts/:id/edit',
        element: <UpdateShift />,
    },
    {
        path: '/booths/create',
        element: <CreateBooth />,
    },
    {
        path: '/booths/:id/edit',
        element: <UpdateBooth />,
    },
    {
        path: '/dashboard-users/create',
        element: <CreateDashboardUser />,
    },
    {
        path: '/dashboard-users/:id/edit',
        element: <UpdateDashboardUser />,
    },
    {
        path: '/mobile-users/create',
        element: <CreateMobileUser />,
    },
    {
        path: '/mobile-users/:id/edit',
        element: <UpdateMobileUser />,
    },
    // {
    //     path: '/vendors/create',
    //     element: <CreateVendor />,
    // },
    // {
    //     path: '/vendors/:id',
    //     element: <VendorProfile />,
    // },
    {
        path: '/roles/create',
        element: <CreatePermissions />,
    },
    {
        path: '/roles/:id',
        element: <UpdatePermissions />,
    },

];

const flattenRoutes = (items: any[]): any[] => {
    return items.flatMap((item) => {
        if (item.children) {
            return flattenRoutes(item.children);
        }

        if (!item.path) return [];

        return {
            path: item.path,
            element: (
                <ProtectedRoute>
                    <SuperAdminLayout>
                        {item.element}
                    </SuperAdminLayout>
                </ProtectedRoute>
            ),
        };
    });
};

// 💡 Flat routes array for router
export const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Navigate to="/areas" replace />
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth/login',
        element:
            <ProtectedAuth>
                <LoginPage />
            </ProtectedAuth>,
    },
    {
        path: '/auth/forget-password',
        element:
            <ProtectedAuth>
                <ForgetPasswordPage />
            </ProtectedAuth>,
    },
    ...modules.flatMap((section) =>
        flattenRoutes(section.items)
    ),
    ...hiddenRoutes.map((route) => ({
        path: route.path,
        element: (
            <ProtectedRoute>
                <SuperAdminLayout>
                    {route.element}
                </SuperAdminLayout>
            </ProtectedRoute>
        ),
    })),
];
