import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  useCarouselMapStore,
  useCarouselStore,
} from "../stores/carouselStore";

// TODO : Footer Systems configurable
// TODO : Move SSE Handling to App level

// Make systems configurable for later
const systems = [
  "Jupyter-JSC",
  "JUWELS",
  "JURECA",
  "JUPYTER",
  "JUSUF",
  "DEEP",
  "JSC-Cloud",
];

const SSEHandler = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const setCarousels = useCarouselStore((state) => state.setCarousels);
  const updateSingle = useCarouselMapStore((state) => state.updateSingle);

  const startSSEConnection = () => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      console.log("SSE connection already exists.");
      return;
    }

    const eventSource = new EventSource("http://localhost:3000/api/sse");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const Carousels: Carousel[] = [];
      for (const system of systems) {
        const carouselItem: Carousel = {
          system: system,
          usercount: 0,
          health: 100,
          message: "",
        };
        const systemKeyFormatted = system.replace("-", "").toUpperCase();
        if (data.incidents && data.incidents[systemKeyFormatted]) {
          carouselItem.health = data.incidents[systemKeyFormatted].health;
          carouselItem.message = data.incidents[systemKeyFormatted].incident;
        }
        if (data.usercount && data.usercount[system] !== undefined) {
          carouselItem.usercount = data.usercount[system];
        }
        updateSingle(system, carouselItem);
        Carousels.push(carouselItem);
      }
      setCarousels(Carousels);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      setIsConnected(false);
      console.log(isConnected);
      eventSource.close();
      eventSourceRef.current = null;
    };
  };
  useEffect(() => {
    startSSEConnection();
  }, []);

  return (
    <div>
      <h2>SSE Handler</h2>
      <button
        onClick={() => {
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            setIsConnected(false);
            console.log("SSE connection manually closed.");
          }
        }}
      >
        Close SSE Connection
      </button>
      <button
        onClick={() => {
          if (!isConnected) {
            startSSEConnection();
          }
        }}
      >
        Start SSE Connection
      </button>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
    </div>
  );
};

export default SSEHandler;
