import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import "./auth.css";
import { useNavigate } from "react-router";
export function AuthPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    navigate("/visor");
    setError("");
  };

  return (
    <div className="w-screen h-screen overflow-hidden background">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Iniciar Sesión
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
