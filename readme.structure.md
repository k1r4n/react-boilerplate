# Folder Structure

├── dist                        # Compiled files
├── src                         # Application Source
    ├── api                     # Api handlers and individual apis (Only export file)
    ├── components              # Components and child components for every route (Only example components)
    ├── hoc                     # Higher order components (Only export file)
    ├── hooks                   # Custom hooks (Only export file)
    ├── pages                   # Routes (Only example components)
    ├── utils                   # Utility functions (Only export file)
    ├── widgets                 # Reusable components (Only example components)
    └── index.jsx               # Application Entry Point
├── static                      # Static contents
    ├── documents               # Documents
    ├── fonts                   # Fonts
    ├── images                  # Images
    ├── styles                  # Stylesheets
    └── index.html              # Index Page
├── webpack_config              # Bundler configurations
    └── webpack.dev.config.js   # Webpack configurations for development
    └── webpack.prod.config.js  # Webpack configurations for Production
└── .babelrc                    # Transpiler configurations (api, components, hoc, hooks, utils and widgets are aliased using babel-module-resolver
                                                            for cleaner  imports)
└── .dockerignore               # Docker ignorable content
└── .eslintrs                   # Linting rules
└── .gitignore                  # Git Ignorable contents
└── .docker-compose.yml         # Development Server configuration
└── .Dockerfile                 # Docker configurations
└── package-lock.json           # Dependency log
└── package.json                # Project configurations
└── Readme.md                   # Project setup instructions
└── readme.structure.md         # Project structure
