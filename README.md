# Property Partner

- My Nguyen
- Jacob Kim
- Tylan Vermaelen
- Chris Cohen

_Property Partner -- Unlocking Your Path to Property Success. Come to us for all your property needs_

## Design

[- API Design](https://gitlab.com/team-20-project-gamma/property-partner/-/blob/main/docs/apis.md?ref_type=heads)

[- Data Model](https://gitlab.com/team-20-project-gamma/property-partner/-/blob/main/docs/data-model.md?ref_type=heads)

[- GHI](https://gitlab.com/team-20-project-gamma/property-partner/-/blob/main/docs/ghi.md?ref_type=heads)

## Intended Market

Property Partner is designed for a variety of users like homeowners, real estate agents, and investors, looking to showcase and sell their properties. Our web app offers a user-friendly and intuitive platform, empowering sellers to market and manage their properties. Additionally, Property Partners welcomes individuals who are simply interested in exploring available properties on the market. We provides an extensive array of filtering options that allow visitors to refine their property searches.

## Functionality

- Unregistered visitors can view a list of all properties currently listed with Property Partner. Visitors are given the ability to filter the listed properties based on their preferred property characteristics.
- Unregistered visitors can view full property details including contact information for the property. This allows interested visitors to initiate further conversations with the property lister for an in-depth discussion about the property.
- Users visiting Property Partner can choose to register for an account, login if they have a pre-existing account, or logout.
- Users that are logged in has the ability to list a property and its details including property location, property characteristics (number of beds/baths, single story/multistory, new build/old build, etc), and property images. The property's contact information is automatically populated from the account holder information.
- Users that are logged in also gain access to a personalized user dashboard where they can view and manage all of their current property listing. The dashboard gives users the ability to edit and un-list their pre-existing properties, as needed.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository to your local machine.
2. CD into the new project directory
3. Run docker volume create postgres-data
4. Run docker volume create pg-admin for access to pg-admin on the browser
5. Run docker compose build
6. Run docker compose up
7. Open localhost:3000 on browser to gain access to Property Partner React web application.
