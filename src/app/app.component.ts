import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarApiService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule  
  ],
  providers:[CarApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarseerWeb';
  makes: any[] = [];
  vehicleTypes: any[] = [];
  models: any[] = [];
  selectedMake!: number;
  selectedYear!: number;
  selectedType!: number;
  page = 1; 
  makeSearchText: string = '';
  typeSearchText: string = '';
  searchText:string = '';

  constructor(private carApiService: CarApiService) {}

  ngOnInit() {
    this.loadCarMakes();
  }

  loadCarMakes() {
    this.carApiService.getCarMakes().subscribe(data => {
      this.makes = data.results;  // Adjust based on API response structure
    });
  }

  onMakeChange() {
    if (this.selectedMake) {
      this.loadVehicleTypes(this.selectedMake);
    }
  }

  loadVehicleTypes(makeId: number) {
    this.carApiService.getVehicleTypes(makeId).subscribe(data => {
      this.vehicleTypes = data.results;  // Adjust based on API response structure
    });
  }

  getModels() {
    if (this.selectedMake && this.selectedYear) {
      this.carApiService.getCarModels(this.selectedMake, this.selectedYear).subscribe(data => {
        this.models = data.results;  // Adjust based on API response structure
      });
    }
  }

  filteredModels() {
    if (!this.searchText) {
      return this.models;
    }
    return this.models?.filter(model =>
      model?.make_Name?.toLowerCase()?.includes(this.searchText?.toLowerCase()) ||
      model?.model_Name?.toLowerCase()?.includes(this.searchText?.toLowerCase())
    );
  }

}
