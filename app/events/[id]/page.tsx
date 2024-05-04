import Map from './map';

export default function Page({ params }: { params: { id: number } }) {
    return (
        <div className="p-12">
            <h1 className="text-6xl ">Event {params.id}</h1>
            <div className="flex flex-row">
                <video className="h-96" controls autoPlay muted>
                    <source src="/onebucket.mp4" type="video/mp4"></source>
                </video>
                <div className="pl-8">
                    <Map />
                </div>
            </div>
        </div>
    )
  }