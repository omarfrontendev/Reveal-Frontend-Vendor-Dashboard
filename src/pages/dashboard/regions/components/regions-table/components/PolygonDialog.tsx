import { MapEditor } from "@/components/ui/MapEditor";

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";

export default function PolygonDialog({ coords, open, setOpen }: { coords: number[]; open: boolean; setOpen: (open: boolean) => void }) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="h-full">
                <DialogHeader>
                </DialogHeader>
                <MapEditor
                    setShapes={() => { }}
                    shapes={[{
                        coords,
                        type: "polygon"
                    }] as any}
                />
            </DialogContent>
        </Dialog>
    )
}