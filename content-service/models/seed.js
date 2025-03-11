const db=require('../db');

const Company = require("./Company");
const Position = require("./Positions");

const seed = async () => {
  await Company.deleteMany();
  await Position.deleteMany();

  await Company.insertMany([
    {
      name: "Google",
      description: "A multinational technology company",
      industry: "Technology",
    },
    {
      name: "Facebook",
      description:
        "An American online social media and social networking service company",
      industry: "Technology",
    },
    {
      name: "Tesla",
      description: "An American electric vehicle and clean energy company",
      industry: "Automotive",
    },
    {
      name: "Amazon",
      description: "An American multinational technology company",
      industry: "Technology",
    },
    {
      name: "Microsoft",
      description: "An American multinational technology company",
      industry: "Technology",
    },
    {
      name: "J P Morgan",
      description: "An American multinational investment bank",
      industry: "Finance",
    },
    {
      name: "Morgan Stanley",
      description: "An American multinational investment bank",
      industry: "Finance",
    },
    {
      name: "Goldman Sachs",
      description: "An American multinational investment bank",
      industry: "Finance",
    },
    {
      name: "Wells Fargo",
      description: "An American multinational financial services company",
      industry: "Finance",
    },
    {
      name: "Bank of America",
      description: "An American multinational investment bank",
      industry: "Finance",
    },
  ]);

  await Position.insertMany([
    {
      title: "Software Engineer",
      description: "Develop software applications",
    },
    {
      title: "Investment Banker",
      description: "Manage investment portfolios",
    },
    {
      title: "Data Scientist",
      description: "Analyze data to provide insights",
    },
    {
      title: "Product Manager",
      description: "Manage product development",
    },
  ]);
};

seed();