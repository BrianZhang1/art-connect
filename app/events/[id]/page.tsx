import Map from './map';
import { events } from '@/app/data';

export default function Page({ params }: { params: { id: number } }) {
    return (
        <div className="p-12">
            <h1 className="text-6xl pb-6">{events[params.id-1].name}</h1>
            <div className="flex flex-row">
                <video className="h-96" controls autoPlay muted>
                    <source src="/onebucket.mp4" type="video/mp4"></source>
                </video>
                <div className="pl-8 w-1/2">
                    <Map />
                </div>
            </div>
        </div>
    )
  }