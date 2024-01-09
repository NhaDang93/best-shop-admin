## Project Setup

We'll begin by creating a default Next.js application with a Typescript template.

```bash
npx create-next-app --ts racing-f1-project

cd racing-f1-project
```

First we will test to make sure the app is working. We're going to be using `yarn` for this example, but you could just as easily use NPM if you choose.

```
yarn install

yarn dev
```

You should see the demo app available on [http://localhost:3000](http://localhost:3000)

First we will test to make sure the app is working. We're going to be using `yarn` for this example, but you could just as easily use NPM if you choose.

```
yarn install

yarn dev
```

You should see the demo app available on [http://localhost:3000](http://localhost:3000)

```
yarn build
```

To ensure you can successfully do a production build of the project. It's recommended (but not required) to close your dev server when running a Next.js build. Most of the time there is no issue but occasionally the build can put your dev server in a weird state that requires a restart.

You should get a nice little report on the command line of all the pages built with green coloured text implying they are small and efficient. We'll try to keep them that way as we develop the project.

## Engine Locking

We would like for all developers working on this project to use the same Node engine and package manager we are using. To do that we create two new files:

- `.nvmrc` - Will tell other uses of the project which version of Node is used
- `.npmrc` - Will tell other users of the project which package manager is used

We are using `Node v14 Fermium` and `yarn` for this project so we set those values like so:

`.nvmrc`

```.nvmrc
lts/fermium
```

`.npmrc`

```
engine-strict=true
```

`.yarnrc`

```
--install.ignore-engines true
```

The reason we are using v14 instead of v16 for Node is that later in the tutorial we will be deploying on Vercel which unfortunately still does not support Node 16. Perhaps by the time you read this tutorial it might. You can follow the progress [here](https://github.com/vercel/community/discussions/37).

You can check your version of Node with `node --version` and make sure you are setting the correct one. A list of Node version codenames can be found [here](https://github.com/nodejs/Release/blob/main/CODENAMES.md)

Note that the use of `engine-strict` didn't specifically say anything about `yarn`, we do that in `package.json`:

`package.json`

```json
  "engines": {
    "node": ">=14.0.0",
    "yarn": ">=1.22.0",
    "npm": "please-use-yarn"
  },
  ...
```

The `engines` field is where you specify the specific versions of the tools you are using. You can also fill in your personal details if you choose.

## Git Setup

This would be a good time to make our first commit to our remote repo, to make sure our changes are backed up, and to follow best practices for keeping related changes grouped within a single commit before moving to something new.

By default your Next.js project will already have a repo initialized. You can check what branch you are on with `git status`. It should say something like:

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .npmrc
        .nvmrc
```

This tells us we are on the `main` branch and we have not staged or made any commits yet.

Let's commit our changes so far.

```
git add .

git commit -m 'project initialization'
```

The first command will add and stage all files in your project directory that aren't ignored in `.gitignore`. The second will make a commit of the state of your current project with the message we wrote after the `-m` flag.

Hop over to your preferred git hosting provider ([Github](https://github.com) for example) and create a new repository to host this project. Make sure the default branch is se tto the same name as the branch on your local machine to avoid any confusion.

On Github you can change your global default branch name to whatever you like by going to:

```
Settings -> Repositories -> Repository default branch
```

Now you are ready to add the remote origin of your repository and push. Github will give you the exact instructions when you create it. Your syntax may be a little different than mine depending on if you are using HTTPS rather than SSH.

```
git init
git commit -m "first commit"
git branch -M {YOUR_BRANCH_NAME}
git remote add origin git@github.com:{YOUR_GITHUB_USERNAME}/{YOUR_REPOSITORY_NAME}.git
git push -u origin {YOUR_BRANCH_NAME}
```

Note that from this point on we will be using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard and specifically the Angular convention [described here](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)

The reason being like many other features in this project to simply set a **consistent** standard for all developers to use to minimize train-up time when contributing to the project. I personally have very little concern as to what standard is chosen, as long as everyone agrees to follow it that is the most important thing.

Consistency is everything!

## Code Formatting and Quality Tools

In order to set a standard that will be used by all contributors to the project to keep the code style consistent and basic best practices followed we will be implementing two tools:

- [eslint](https://eslint.org/) - For best practices on coding standards
- [prettier](https://prettier.io/) - For automatic formatting of code files

### ESLint

We'll begin with ESLint, which is easy because it automatically comes installed and pre-configured with Next.js projects.

We are just going to add a little bit of extra configuration and make it a bit stricter than it is by default. If you disagree with any of the rules it sets, no need to worry, it's very easy to disable any of them manually. We configure everything in `.eslintrc.json` which should already exist in your root directory:

`package.json`

```json
  "lint": "next lint",
  "lint:fix": "eslint --fix ."
  ...
```

`.eslintrc.json`

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "prettier",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".tsx", ".ts", ".js", ".json"]
      },
      "alias": [
        ["src", "./src"],
        ["server", "./server"]
      ]
    }
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "react-hooks"],
  "rules": {
    "semi": 0,
    "indent": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,

    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,

    "no-use-before-define": 0,
    "no-unused-vars": 0,
    "no-param-reassign": 0,
    "implicit-arrow-linebreak": 0,
    "consistent-return": 0,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,

    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,

    "no-underscore-dangle": 0,
    "react/function-component-definition": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "arrow-body-style": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/no-cycle": 0,
    "prefer-arrow-callback": 0
  }
}
```

```
yarn add -D eslint-config-airbnb

yarn add -D eslint-config-prettier

yarn add -D @typescript-eslint/eslint-plugin

yarn add -D @typescript-eslint/parser

yarn add -D eslint-import-resolver-alias

yarn add -D eslint-config-next

yarn add -D eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y

eslint-plugin-react-hooks

yarn add  typescript@4.8.3

```

In the above small code example we have added a few additional defaults, we have said that `React` will always be defined even if we don't specifically import it, and I have added a personal custom rule that I like which allows you to prefix variables with an underscore \_ if you have declared them but not used them in the code.

I find that scenario comes up often when you are working on a feature and want to prepare variables for use later, but have not yet reached the point of implementing them.

You can test out your config by running:

```
yarn lint
yarn lint:fix
```

You should get a message like:

```
✔ No ESLint warnings or errors
Done in 1.47s.
```

If you get any errors then ESLint is quite good at explaining clearly what they are. If you encounter a rule you don't like you can disable it in "rules" by simply setting it to 1 (warning) or 0 (ignore) like so:

```json
  "rules": {
    "no-unused-vars": 0, // As example: Will never bug you about unused variables again
  }
```

Let's make a commit at this point with the message `build: configure eslint`

### Prettier

Prettier will take care of automatically formatting our files for us. Let's add it to the project now.

It's only needed during development, so I'll add it as a `devDependency` with `-D`

```
yarn add -D prettier
```

I also recommend you get the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) so that VS Code can handle the formatting of the files for you and you don't need to rely on the command line tool. Having it installed and configured in your project means that VSCode will use your project's settings, so it's still necessary to add it here.

We'll create two files in the root:

`.prettierrc`

```.prettierrc
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

Those values are entirely at your discretion as to what is best for your team and project.

`.prettierignore`

```
.yarn
.next
dist
node_modules
```

In that file I've placed a list of directories that I don't want Prettier to waste any resources working on. You can also use patterns like \*.html to ignore groups of types of files if you choose.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```
  ...
  "scripts: {
    ...
    "prettier": "prettier --write ."
  }
```

You can now run

```
yarn prettier
```

to automatically format, fix and save all files in your project you haven't ignored. By default my formatter updated about 5 files. You can see them in your list of changed files in the source control tab on the left of VS Code.

Let's make another commit with `build: implement prettier`.

## Git Hooks

One more section on configuration before we start getting into component development. Remember you're going to want this project to be as rock solid as possible if you're going to be building on it in the long term, particularly with a team of other developers. It's worth the time to get it right at the start.

We are going to implement a tool called [Husky](https://typicode.github.io/husky/#/)

Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc. We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

To install Husky run

```
yarn add -D husky

npx husky install
```

The second command will create a `.husky` directory in your project. This is where your hooks will live. Make sure this directory is included in your code repo as it's intended for other developers as well, not just yourself.

Add the following script to your `package.json` file:

`package.json`

```
  ...
  "scripts: {
    ...
    "prepare": "husky install"
  }
```

This will ensure Husky gets installed automatically when other developers run the project.

To create a hook run

```
npx husky add .husky/pre-commit "yarn lint"
```

The above says that in order for our commit to succeed, the `yarn lint` script must first run and succeed. "Succeed" in this context means no errors. It will allow you to have warnings (remember in the ESLint config a setting of 1 is a warning and 2 is an error in case you want to adjust settings).

Let's create a new commit with the message `ci: implement husky`. If all has been setup properly your lint script should run before the commit is allowed to occur.

We're going to add another one:

```
npx husky add .husky/pre-push "yarn build"
```

The above ensures that we are not allowed to push to the remote repository unless our code can successfully build. That seems like a pretty reasonable condition doesn't it? Feel free to test it by committing this change and trying to push.

---

Lastly we are going to add one more tool. We have been following a standard convention for all our commit messages so far, let's ensure that everyone on the team is following them as well (including ourselves!). We can add a linter for our commit messages:

```
yarn add -D @commitlint/config-conventional @commitlint/cli
```

To configure it we will be using a set of standard defaults, but I like to include that list explicitly in a `commitlint.config.js` file since I sometimes forget what prefixes are available:

`commitlint.config.js`

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
```

Then enable commitlint with Husky by using:

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# Sometimes above command doesn't work in some command interpreters
# You can try other commands below to write npx --no -- commitlint --edit $1
# in the commit-msg file.
npx husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"
# or
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

Feel free to try some commits that _don't_ follow the rules and see how they are not accepted, and you receive feedback that is designed to help you correct them.

I'm going to create a new commit now with the message `ci: implement commitlint`.

You can see the result of the complete culmination of this setup in the screenshot below, hopefully yours looks similar:

![Dev Experience](https://res.cloudinary.com/dqse2txyi/image/upload/v1649129725/blogs/nextjs-fullstack-app-template/dev-experience_wznie9.png)

## VS Code Configuration

Now that we have implemented ESLint and Prettier we can take advantage of some convenient VS Code functionality to have them be run automatically.

Create a directory in the root of your project called `.vscode` and inside a file called `settings.json`. This will be a list of values that override the default settings of your installed VS Code.

The reason we want to place them in a folder for the project is that we can set specific settings that only apply to this project, and we can share them with the rest of our team by including them in the code repository.

Within `settings.json` we will add the following values:

`.vscode/settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

The above will tell VS Code to use your Prettier extension as the default formatter (you can override manually if you wish with another one) and to automatically format your files and organize your import statements every time you save.

Very handy stuff and just another thing you no longer need to think about so you can focus on the important things like solving business problems.

I'll now make a commit with message `build: implement vscode project settings`.

## Install MUI

```
yarn add @mui/material@5.10.5
yarn add mdi-material-ui
yarn add @mui/icons-material
yarn add @emotion/react
yarn add @emotion/styled
```
