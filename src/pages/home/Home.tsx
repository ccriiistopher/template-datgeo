import { Map, MapBrowserEvent, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { Cluster, OSM, Vector } from "ol/source";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Stroke, Fill, Circle, Text } from "ol/style";
import React, { useCallback, useEffect, useState } from "react";
import { TaskState } from "../../shared/State";
import { Loader } from "./components/loader/Loader";
import { InstitutionDialog } from "./components/dialog/InstitutionDialog";

export function HomePage() {
  const [departmentsLayer, setDepartmentsLayer] = useState<VectorLayer | null>(
    null
  );
  const [districtsLayer, setDistrictsLayer] = useState<VectorLayer | null>(
    null
  );
  const [provincesLayer, setProvincesLayer] = useState<VectorLayer | null>(
    null
  );
  const [institLayer, setInstitLayer] = useState<VectorLayer | null>(null);
  const [layersState, setLayersState] = useState<TaskState | null>(null);
  const [dialogData, setDialogData] = useState<any>();

  const [dMap, setDMap] = useState<Map | null>(null);

  const loadPolygonLayer = useCallback(async (path, color) => {
    const res = await fetch(path);
    const json = await res.json();
    const vectorSource = new Vector({
      features: new GeoJSON().readFeatures(json, {
        featureProjection: "EPSG:3857",
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: color,
          width: 2,
        }),
      }),
    });
    return vectorLayer;
  }, []);

  const loadPointClusterLayer = useCallback(async (path) => {
    const res = await fetch(path);
    const json = await res.json();
    const vectorSource = new Vector({
      features: new GeoJSON().readFeatures(json, {
        featureProjection: "EPSG:3857",
      }),
    });

    const clusterSource = new Cluster({
      distance: 40,
      minDistance: 20,
      source: vectorSource,
    });

    const clusterStyle = function (feature) {
      const size = feature.get("features").length;
      return new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: "rgba(255, 153, 0, 0.6)",
          }),
          stroke: new Stroke({
            color: "#ff9933",
            width: 2,
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: "#fff",
          }),
        }),
      });
    };

    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: clusterStyle,
    });
    return clusterLayer;
  }, []);

  const loadLayers = useCallback(async () => {
    setLayersState({
      loading: true,
    });
    try {
      const dLayer = await loadPolygonLayer(
        "/data/output_departamentos.geojson",
        "black"
      );
      const diLayer = await loadPolygonLayer(
        "/data/output_distritos.geojson",
        "red"
      );
      const pLayer = await loadPolygonLayer(
        "/data/output_provincias.geojson",
        "blue"
      );
      const iLayer = await loadPointClusterLayer(
        "/data/output_instituciones_educ.geojson"
      );
      setDistrictsLayer(diLayer);
      setDepartmentsLayer(dLayer);
      setProvincesLayer(pLayer);
      setInstitLayer(iLayer);
      setLayersState({
        loading: false,
        data: true,
        error: null,
      });
    } catch (e) {
      setLayersState({
        loading: false,
        data: null,
        error: e,
      });
    }
  }, [
    setDepartmentsLayer,
    setDistrictsLayer,
    setProvincesLayer,
    setLayersState,
    setInstitLayer,
    loadPolygonLayer,
  ]);

  useEffect(() => {
    const _map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-8246936.494308056, -1119428.8251098266],
        zoom: 7,
        maxZoom: 50,
        minZoom: 5,
      }),
    });

    _map.render();
    setDMap(_map);
    loadLayers();
    return () => {
      setDMap(null);
      _map.dispose();
    };
  }, []);
  1;

  const onClickListener = useCallback(
    (event: MapBrowserEvent<any>) => {
      dMap!.forEachFeatureAtPixel(event.pixel, function (feature) {
        const features = feature.get("features");
        if (!!features && features.length > 0) {
          const properties = features.map((it) => it.getProperties());
          setDialogData(properties);
        }
      });
    },
    [setDialogData, dMap]
  );

  useEffect(() => {
    if (!!dMap) {
      dMap.on("singleclick", onClickListener);

      if (
        !!departmentsLayer &&
        !!provincesLayer &&
        !!districtsLayer &&
        !!institLayer &&
        !institLayer.hasRenderer()
      ) {
        dMap.addLayer(institLayer);
        dMap.addLayer(departmentsLayer);
        const view = dMap.getView();
        if (!view.hasListener("change:resolution")) {
          let mode = 3;

          view.on("change:resolution", () => {
            const zoomLevel = view.getZoom() || 0;
            if (zoomLevel >= 11) {
              if (mode !== 1) {
                dMap.removeLayer(departmentsLayer);
                dMap.removeLayer(provincesLayer);
                dMap.addLayer(districtsLayer);

                mode = 1;
              }
            } else if (zoomLevel >= 9) {
              if (mode !== 2) {
                dMap.removeLayer(departmentsLayer);
                dMap.removeLayer(districtsLayer);
                dMap.addLayer(provincesLayer);

                mode = 2;
              }
            } else {
              if (mode !== 3) {
                dMap.removeLayer(provincesLayer);
                dMap.removeLayer(districtsLayer);
                dMap.addLayer(departmentsLayer);
                mode = 3;
              }
            }
          });
        }
      }
    }
  }, [dMap, departmentsLayer, provincesLayer, districtsLayer, onClickListener]);

  const closeDialog = useCallback(() => {
    setDialogData(null);
  }, [setDialogData]);
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      ></div>
      <InstitutionDialog
        open={!!dialogData}
        onClose={closeDialog}
        data={dialogData}
      />
      <Loader loading={layersState?.loading ?? false} />
    </div>
  );
}
