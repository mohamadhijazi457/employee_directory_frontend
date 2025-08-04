# Employee Directory Frontend

A modern React TypeScript application for managing employee information with a clean, responsive interface built with Tailwind CSS.

## Features

- **Employee Management**: View, create, edit, and delete employee records
- **Search & Filter**: Real-time search functionality across employee data
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **TypeScript**: Full type safety and better development experience
- **Modern UI**: Clean, professional interface with Headless UI components
- **Pagination**: Efficient data loading with cursor-based pagination
- **Form Validation**: Comprehensive form handling with validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running on `http://127.0.0.1:5000/api`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee_directory_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── api/                    # API configuration and services
│   ├── axios.ts           # Axios instance configuration
│   └── employee.ts        # Employee API endpoints
├── components/            # React components
│   ├── common/           # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── select.tsx
│   └── employeeTable/    # Employee-specific components
│       ├── employeeForm.tsx
│       ├── employeeRow.tsx
│       ├── employeeTable.tsx
│       └── searchBar.tsx
├── types/                # TypeScript type definitions
│   └── employee.ts       # Employee data types
├── utils/                # Utility functions
│   └── api.ts           # API utility functions
├── styles/              # CSS styles
│   └── common.css       # Common styles
└── App.tsx              # Main application component
```

## Architecture

### Core Technologies

- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **Headless UI**: Accessible UI components

### Data Flow

1. **API Layer**: Centralized API configuration with Axios
2. **State Management**: React hooks for local state management
3. **Component Architecture**: Modular, reusable components
4. **Type Safety**: Comprehensive TypeScript interfaces

## Employee Data Model

```typescript
interface Employee {
  id: number
  fullname: string
  email: string
  phone: string
  city: string
  gender: Gender
  date_of_birth: string
  marital_status: string
  education: string
  skills: string[]
  manager_id: number | null
  position: string
  salary: number
  created_at: string
  updated_at: string
}
```

## Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run tests in watch mode
```

### Production
```bash
npm run build      # Build for production
npm run eject      # Eject from Create React App (one-way)
```

## API Configuration

The application is configured to connect to a backend API at:
- **Base URL**: `http://127.0.0.1:5000/api`
- **Content-Type**: `application/json`

### API Endpoints

The application expects the following API endpoints:

- `GET /employees` - Fetch employee list with pagination
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

## UI Components

### Common Components
- **Button**: Reusable button component with variants
- **Input**: Form input with validation support
- **Modal**: Overlay modal for forms and dialogs
- **Select**: Dropdown selection component

### Employee Components
- **EmployeeTable**: Main table displaying employee data
- **EmployeeRow**: Individual employee row with actions
- **EmployeeForm**: Create/edit employee form
- **SearchBar**: Real-time search functionality

## Features in Detail

### Employee Management
- **View**: Display employee information in a responsive table
- **Create**: Add new employees through a modal form
- **Edit**: Modify existing employee data
- **Delete**: Remove employees with confirmation

### Search & Filter
- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Search across name, email, position, and city
- **Case-insensitive**: Search works regardless of case

### Pagination
- **Cursor-based**: Efficient pagination for large datasets
- **Load More**: Progressive loading for better performance
- **State Management**: Maintains search state across pages

## Testing

```bash
npm test              # Run tests in watch mode
npm test -- --coverage # Run tests with coverage report
```

## Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **Docker**: Containerize the application
- **CDN**: Serve static files through a CDN

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:5000/api
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## Version History

- **v0.1.0**: Initial release with basic employee management features
- Future versions will include additional features and improvements

---

Built with using React, TypeScript, and Tailwind CSS
