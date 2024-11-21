import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarModelService } from 'src/services/car-model.service';
import { MenuService } from 'src/services/menu.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-angular-app';
  formGroup!: FormGroup;
  menu: string[] = [];
  isComponentLoaded = false;
  carModelForm: FormGroup;
  brands = ['Audi', 'Jaguar', 'Land Rover', 'Renault'];
  classes = ['A-Class', 'B-Class', 'C-Class'];
  fileError: string | null = null;
  filteredModels = [];
  carmodelService= inject(CarModelService)

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private notificationService: NotificationService
  ) {
    this.carModelForm = this.fb.group({
      brand: ['', Validators.required],
      class: ['', Validators.required],
      modelName: ['', Validators.required],
      modelCode: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,10}$')],
      ],
      description: ['', Validators.required],
      features: ['', Validators.required],
      price: ['', Validators.required],
      manufacturingDate: ['', Validators.required],
      active: [false],
      sortOrder: [0],
    });
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const maxFileSize = 5 * 1024 * 1024;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxFileSize) {
          this.fileError = 'Each file must be less than 5MB.';
          return;
        }
      }
      this.fileError = null;
    }
  }

  onSearch(searchTerm: string) {
    // Filter models based on search term (mock implementation)
    this.filteredModels = []; // Replace with actual filtering logic
  }

  onSubmit() {
      console.log(this.carModelForm.value);
  }

  ngOnInit() {
    // Initialize form
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.carmodelService.getCarModels().subscribe(
      (data) => {
        debugger;
        this.brands = data.map((model: any) => model.name);// Store the response data
        console.log(this.brands)

      },
      (error) => {
        console.error('Error fetching car models:', error); // Handle error
      }
    );
    // Load menu for role (replace 'admin' with dynamic role fetching logic)
    this.menu = this.menuService.getMenu('admin');
  }

  showNotification() {
    this.notificationService.showMessage('This is a notification!');
  }

  loadComponent() {
    this.isComponentLoaded = true;
  }
}
