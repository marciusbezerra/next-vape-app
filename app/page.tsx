"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tabela de potências (simplificada para este exemplo)
const powerTable: { [key: string]: number[] } = {
  "0.10": [40.0, 62.5, 90.0, 122.5, 136.9, 160.0, 202.5, 250.0, 302.5, 360.0],
  "0.20": [20.0, 31.3, 45.0, 61.3, 68.5, 80.0, 101.3, 125.0, 151.3, 180.0],
  "0.30": [13.3, 20.8, 30.0, 40.8, 45.6, 53.3, 67.5, 83.3, 100.8, 120.0],
  "0.40": [10.0, 15.6, 22.5, 30.6, 34.2, 40.0, 50.6, 62.5, 75.6, 90.0],
  "0.50": [8.0, 12.5, 18.0, 24.5, 27.4, 32.0, 40.5, 50.0, 60.5, 72.0],
  "0.60": [6.7, 10.4, 15.0, 20.4, 22.8, 26.7, 33.8, 41.7, 50.4, 60.0],
  "0.70": [5.7, 8.9, 12.9, 17.5, 19.6, 22.9, 28.9, 35.7, 43.2, 51.4],
  "0.80": [5.0, 7.8, 11.3, 15.3, 17.1, 20.0, 25.3, 31.3, 37.8, 45.0],
  "0.90": [4.4, 6.9, 10.0, 13.6, 15.2, 17.8, 22.5, 27.8, 33.6, 40.0],
  "1.00": [4.0, 6.3, 9.0, 12.3, 13.7, 16.0, 20.3, 25.0, 30.3, 36.0],
};

export default function VapePowerCalculator() {
  const [resistance, setResistance] = useState("");
  const [normalRange, setNormalRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [quenteValue, setQuenteValue] = useState<number | null>(null);

  const resistanceOptions = useMemo(() => Object.keys(powerTable), []);

  const calculateNormalRange = (selectedResistance: string) => {
    const powers = powerTable[selectedResistance];
    if (powers) {
      // Considerando "NORMAL" as potências nas posições 2 e 3 (índices 1 e 2)
      setNormalRange({
        min: Math.min(powers[3], powers[4]),
        max: Math.max(powers[3], powers[4]),
      });
      // Considerando "QUENTE" a potência na posição 4 (índice 3)
      setQuenteValue(powers[5]);
    } else {
      setNormalRange(null);
      setQuenteValue(null);
    }
  };

  const handleResistanceChange = (value: string) => {
    setResistance(value);
    calculateNormalRange(value);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Calculadora de Potência para Vape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistência da Coil (Ohms)</Label>
              <Select onValueChange={handleResistanceChange} value={resistance}>
                <SelectTrigger id="resistance">
                  <SelectValue placeholder="Selecione a resistência" />
                </SelectTrigger>
                <SelectContent>
                  {resistanceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}Ω
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {normalRange && (
              <div className="mt-4 p-4 bg-primary/10 rounded-md">
                <p className="text-lg font-semibold">
                  Intervalo de Potência Normal:
                </p>
                <p className="text-xl font-bold text-green-600">
                  {normalRange.min.toFixed(1)}W - {normalRange.max.toFixed(1)}W
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Este é o intervalo de potência considerado &quot;NORMAL&quot;
                  para a resistência selecionada.
                </p>
              </div>
            )}
            {quenteValue && (
              <div className="mt-4 p-4 bg-primary/10 rounded-md">
                <p className="text-lg font-semibold">
                  Valor de Potência Quente:
                </p>
                <p className="text-xl font-bold text-orange-600">
                  {quenteValue.toFixed(1)}W
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Este é o intervalo de potência considerado &quot;QUENTE&quot;
                  para a resistência selecionada.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
