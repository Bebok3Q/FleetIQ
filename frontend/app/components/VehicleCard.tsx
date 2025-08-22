import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Truck, MapPin, Fuel, Calendar, AlertCircle, Gauge, Thermometer, Zap } from "lucide-react";

export interface Vehicle {
    id: number;
    vin: string;
    model: string;
    year: number;
    odometer: number;
    // Opcjonalne pola z telemetrii
    latest_telemetry?: {
        speed: number;
        coolant_temp: number;
        rpm: number;
        timestamp: string;
    } | null;
    // Opcjonalne pole z alertami
    latest_alert?: {
        severity: string;
        alert_type: string;
        message: string;
        ts: string;
    } | null;
}

interface VehicleCardProps {
    vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High':
                return 'bg-red-100 text-red-800 hover:bg-red-100';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
            case 'Low':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    const getTemperatureColor = (temp: number) => {
        if (temp > 100) return 'text-red-600';
        if (temp > 80) return 'text-yellow-600';
        return 'text-green-600';
    };

    const getSpeedColor = (speed: number) => {
        if (speed > 80) return 'text-red-600';
        if (speed > 60) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <h3 className="font-medium">{vehicle.year} {vehicle.model}</h3>
                            <p className="text-sm text-muted-foreground">VIN: {vehicle.vin}</p>
                        </div>
                    </div>
                    {vehicle.latest_alert && (
                        <Badge className={getSeverityColor(vehicle.latest_alert.severity)} variant="secondary">
                            {vehicle.latest_alert.severity}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span>Odometer: {vehicle.odometer.toLocaleString()} km</span>
                </div>
                
                {vehicle.latest_telemetry && (
                    <>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Speed: <span className={getSpeedColor(vehicle.latest_telemetry.speed)}>{vehicle.latest_telemetry.speed} km/h</span></span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Thermometer className={`h-4 w-4 ${getTemperatureColor(vehicle.latest_telemetry.coolant_temp)}`} />
                            <span>Coolant: <span className={getTemperatureColor(vehicle.latest_telemetry.coolant_temp)}>{vehicle.latest_telemetry.coolant_temp}°C</span></span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>RPM: {vehicle.latest_telemetry.rpm.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Last Update: {new Date(vehicle.latest_telemetry.timestamp).toLocaleString()}</span>
                        </div>
                    </>
                )}

                {vehicle.latest_alert && (
                    <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="font-medium">{vehicle.latest_alert.alert_type}:</span>
                            <span>{vehicle.latest_alert.message}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            Alert Time: {new Date(vehicle.latest_alert.ts).toLocaleString()}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
