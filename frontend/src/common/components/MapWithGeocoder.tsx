import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = ({ lat, lng }: { lat: number, lng: number }) => {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_KEY

    useEffect(() => {
        mapboxgl.accessToken = ACCESS_TOKEN;

        if (mapRef.current) return; // initialize map only once
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current!,
            center: [lng, lat], // starting position [lng, lat]
            zoom: 17, // starting zoom
            style: 'mapbox://styles/mapbox/streets-v11',
        });
    }, [mapRef.current]);

    return (
        <div
            style={{ height: '300px' }}
            ref={mapContainerRef}
        />
    );
};

export default MapboxExample;