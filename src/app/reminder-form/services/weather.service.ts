import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string;
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiKey = environment.openWeatherApiKey;
    this.baseUrl = environment.openWeatherBaseURL;
  }

  getWeatherInformation(city: string): Observable<any> | undefined {
    if (city) return this.httpClient.get<any>(`${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`);
    return undefined;
  }
}
