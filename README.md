# Integrated Interview Platform

This platform provides a comprehensive solution for conducting technical interviews with three main features: one-on-one video interviews, a live quiz platform, and an integrated code editor with AI-powered test case generation.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **One-on-One Video Interviews**: 
   - Secure video calls for real-time interviews.
   - Allows for face-to-face interaction and technical discussions.

2. **Integrated Live Quiz Platform**:
   - Conduct real-time quizzes during interviews.
   - Supports multiple-choice questions (MCQs) and displays live results.

3. **Integrated Code Editor**:
   - Supports coding assessments within the interview interface.
   - Automatically generates test cases for written code using Large Language Models (LLMs) for enhanced testing and feedback.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/hustlerZzZ/talentIQ.git
    cd talentIQ
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    npm i
    ```

3. Configure environment variables as needed (refer to `.env.example` for guidance).

4. Start the application:
    ```bash
    npm run dev
    ```

## Usage

1. **Start a Video Interview**: Schedule or initiate a one-on-one video interview with the candidate.
2. **Live Quiz Administration**: Choose from a variety of quiz questions or create custom quizzes, with real-time feedback.
3. **Code Testing**: Use the built-in editor to assess coding skills, with automatic test case generation to evaluate the candidate’s code.

## Technologies Used

- **Frontend**: React.js, TailwindCSS, Redux, Clerk, Radix, Clsx, LucidReact, ReactRouterDom, Socket, Y.js, ReactQuery 
- **Backend**: Node.js, Clerk, B crypt js, cors , express , helmet, http,jwt, multor,socket, prisma,
- **Video Calls**: WebRTC
- **Coding**: Monaco editor, Fs, llama for generatign test cases and compiling
- **AI for Test Cases**: Large Language Model (LLM) of Llama 3.1 8b through Gorq

