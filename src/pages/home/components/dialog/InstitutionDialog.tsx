import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  Pagination,
} from "@mui/material";
import React, { Fragment, useMemo } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  data: any[];
};

export function InstitutionDialog({ onClose, open, data }: Props) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const it = useMemo(() => {
    if (!!data && data.length >= page) {
      return data[page - 1];
    }
    return null;
  }, [data, page]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
          p: 2,
        }}
      >
        {!!data && (
          <Fragment>
            {!!it && (
              <List>
                <ListItem>
                  <ListItemText primary="Nombre" secondary={it.nombre} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Nivel y modalidad"
                    secondary={it.nivel_modalidad}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Código modular"
                    secondary={it.cod_modular}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Dirección" secondary={it.direccion} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Departamento, provincia, distrito, centro poblado"
                    secondary={`${it.departamento}, ${it.provincia}, ${it.distrito}, ${it.centro_poblado}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="UGEL, código UGEL"
                    secondary={`${it.ugel}, ${it.codigo_ugel}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gestión y dependencia"
                    secondary={it.gestion_dependencia}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ubigeo" secondary={it.ubigeo} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Altitud, latitud y longitud"
                    secondary={`${it.altitud}, ${it.latitud}, ${it.longitud}`}
                  />
                </ListItem>
              </List>
            )}
            <Pagination
              page={page}
              onChange={handleChange}
              count={data.length}
            />
            <Button onClick={onClose}>CERRAR</Button>
          </Fragment>
        )}
      </Box>
    </Modal>
  );
}
