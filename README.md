# InvestorBook

Welcome to InvestorBook, Inc! This is your first week at InvestorBook and you
are excited to ship a new version of the app.

## Your Task

You meet with the CEO and your first task is to decide on what project you want to work on.

1. Back-end

    If you want to show your skills writing clean, testable, and performant code for the back-end, check out the `prompt_backend.md` file.

2. Front-end developer

    If you want to show your skills writing clean, testable, and performant code for the front-end, check out the `prompt_frontend.md` file.

3. Integration / Design

    If you want to show your front-end design and integration skills, check out the `prompt_integration.md` file.

## Webclient Sample App

If you have docker and docker-compose installed on your system, you can start
the sample webclient with `docker-compose up`. The address will be
http://localhost:3001.

If you prefer, you can instead run `yarn install` and `yarn start` in the
`webclient/` subdirectory.

## Submitting Your Solution

To submit your solution, please deploy your app and send us a link to the live
demo along with a zip file containing the source code.

If you'd like to use Heroku for the deploy, you can run these commands to deploy
the app in your Heroku account:

```
heroku git:remote -a {your_app_name}
heroku buildpacks:set marks/create-react-app
git push heroku master
```
