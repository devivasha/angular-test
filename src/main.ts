import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/courses', ({ request, params, cookies }) => {
    return HttpResponse.json([
      {
        "id": 1,
        "name": "Fundamentals of Credit",
        "imageUrl": "https://picsum.photos/100/100",
        "status": "DRAFT",
        "instructors":[
      {
        "name":"Roli Jain",
        "image": "https://picsum.photos/300/300"
      },
    {
      "name": "Sebastian Taylor",
      "image": "https://picsum.photos/300/300"
    }]},
      {
        "id": 2,
        "name": "Accounting Fundamentals",
        "status": "PUBLISHED",
        "imageUrl": "https://picsum.photos/100/100",
        "instructors":[
      {
        "name":"Roli Jain",
        "image": "https://picsum.photos/300/300"
      }]}]);
  }),
  http.get('/courses/:id', ({ params }) => {

    const courses = {
      "id": 1,
      "name": "Fundamentals of Credit",
      "images": [
        "https://picsum.photos/300/300",
        "https://picsum.photos/300/300",
        "https://picsum.photos/300/300"
      ],
      "instructors": [
      {
        "name": "Roli Jain",
        "image": "https://picsum.photos/300/300"
      },
    {
      "name": "Sebastian Taylor",
      "image": "https://picsum.photos/300/300"
    }]}
    // @ts-ignore
    return HttpResponse.json(courses[params.id.toUpperCase()]);
  }),
];

setupWorker(...handlers).start()
  .then(() => bootstrapApplication(AppComponent))
  .catch((err) => console.error(err));
