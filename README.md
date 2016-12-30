# Clarifai NSFW Form Checker

## This project checks form inputs for NSFW content before allowing a form submission. 

*Note: This is completely client-side. If you need something with a lower chance of being fooled, please implement a solution server-side.*

![](http://i.lws.io/ibJu/Screen%20Recording%202016-12-30%20at%2004.59%20pm.gif)

### Dependencies

* jQuery 

### Get the project set up

1. Go to the [Clarifai](http://clarifai.com) website, sign up for an account and create a new application. Make sure you Default Model to NSFW. 
2. Rename **options.js.exmaple** to **options.js**
3. Copy your Client ID and copy it into the `CLIENT_ID` variable in **options.js**
4. Copy your Client Secret and copy it into the `CLIENT_SECRET` variable in **options.js**

*Note: Do not share your Client ID or Secret. The file __options.js__ is already included in the __.gitignore__ file, meaning it will not be committed to your git repo.*

### Implement for your form

1. Create a `<form>` element and give it an ID.
2. Make sure the ID is correct in the `FORM_ID` variable in **options.js**
3. Create a `<input type="file">` and give it an class.
4. Make sure the class is correct in the `FILE_CLASS` variable in **options.js**
5. Make sure there is a `<input type="submit">` in your form.

### Altering the threshold 

Dependent on what your project is, you may wish to lower/increase the lower SFW value allowed by this project. You can do this by changing the `SFW_LOWER_LIMIT` variable in **options.js**

Remember that the value must be between 0 and 1, where 1 is compltely SFW and 0 is completely NSFW. 

### To do 

- [ ] Work with more than one file input in a form
