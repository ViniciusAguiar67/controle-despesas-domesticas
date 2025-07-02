import { LocationRepository } from '../repositories/LocationRepository';
import { Location } from '../models/Location';

class LocationService {
    async getLocationById(id: number) {
        const location = await new LocationRepository().getLocationById(id);
        if (!location) throw new Error('Endereço não encontrado');
        return location;
    }

    async createLocation(location: Location) {
        return await new LocationRepository().createLocation(location);
    }

    async updateLocation(id: number, location: Location) {
        const existing = await new LocationRepository().getLocationById(id);
        if (!existing) throw new Error('Endereço não encontrado');

        if (!location.state || !location.city || !location.address) {
         throw new Error('Alguns dados do endereço não foram preenchidos');
        }

        await new LocationRepository().updateLocation(id, location);
    }

    async deleteLocation(id: number) {
        const existing = await new LocationRepository().getLocationById(id);
        if (!existing) throw new Error('Endereço não encontrado');
        await new LocationRepository().deleteLocation(id);
    }
}

export { LocationService };