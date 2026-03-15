import React from 'react'
import CreateAccountDrawer from '@/components/Create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

const DashboardPage = () => {

    return (
        <div>
            {/* Budget Progress */}
            
            {/* Overview */}

            {/* Account Grid */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer ">
                        <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                            <Plus 
                                className="w-10 h-10 mb-2"
                            />
                            <p className="text-sm font-medium">
                                Add New Account
                            </p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>
            </div>
        </div>
    )
}

export default DashboardPage
