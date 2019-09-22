import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DBData implements InMemoryDbService {
  createDb() {
    return {
      tests: [
        {
          id: 1,
          testName: 'Leaf Rake',
          testCode: 'EPS-0011',
          description: 'Leaf rake with 48-inch wooden handle',
          starRating: 3.2
        },
        {
          id: 2,
          testName: 'Garden Cart',
          testCode: 'EPS-0023',
          description: '15 gallon capacity rolling garden cart',
          starRating: 4.2
        },
        {
          id: 5,
          testName: 'Hammer',
          testCode: 'CER-0048',
          description: 'Curved claw steel hammer',
          starRating: 4.8
        },
        {
          id: 8,
          testName: 'Saw',
          testCode: 'CER-0022',
          description: '15-inch steel blade hand saw',
          starRating: 3.7
        },
        {
          id: 10,
          testName: 'Video Game Controller',
          testCode: 'ECL-0042',
          description: 'Standard two-button video game controller',
          starRating: 4.6
        }
      ],
      apps: [
        {
          id: 1,
          appName: 'Leaf Rake',
          appCode: 'EPS-0011',
          description: 'Leaf rake with 48-inch wooden handle',
          starRating: 3.2
        },
        {
          id: 2,
          appName: 'Garden Cart',
          appCode: 'EPS-0023',
          description: '15 gallon capacity rolling garden cart',
          starRating: 4.2
        },
        {
          id: 5,
          appName: 'Hammer',
          appCode: 'CER-0048',
          description: 'Curved claw steel hammer',
          starRating: 4.8
        },
        {
          id: 8,
          appName: 'Saw',
          appCode: 'CER-0022',
          description: '15-inch steel blade hand saw',
          starRating: 3.7
        },
        {
          id: 10,
          appName: 'Video Game Controller',
          appCode: 'ECL-0042',
          description: 'Standard two-button video game controller',
          starRating: 4.6
        }
      ]
    };
  }
}
