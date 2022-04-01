// // import React from 'react';
// // import { shallow } from 'enzyme';
// // import Routes, { App, NoMatch } from './Routes';
// // import { Route } from 'react-router-dom';

// // let pathMap = {};
// // describe('routes using array of routers', () => {
// //   beforeAll(() => {
// //     const component = shallow(<Routes />);
// //     pathMap = component.find(Route).reduce((pathMap, route) => {
// //       const routeProps = route.props();
// //       pathMap[routeProps.path] = routeProps.component;
// //       return pathMap;
// //     }, {});
// //     console.log(pathMap);
// //   });
// //   it('should show Home component for / router (getting array of routes)', () => {
// //     expect(pathMap['/']).toBe(App);
// //   });
// //   it('should show No match component for route not defined', () => {
// //     expect(pathMap['undefined']).toBe(NoMatch);
// //   });
// // });

// import React from 'react';
// import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import App from './App';

// describe('unit-test', () => {
//   it("renders the right component with following path '/impressum'", () => {
//     const { getByTestId } = render(
//       <MemoryRouter initialEntries={['/impressum']}>
//         <App></App>
//       </MemoryRouter>
//     );

//     let impressumPage = getByTestId('impressum-page');

//     expect(impressumPage).toBeInTheDocument();
//   });
// });
