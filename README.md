# Retain
Retain is a learning tool motivated by the protégé effect, targeted towards non-visual learners. With cosine similarity, it checks a student's retention as they recapitulate contents of a chosen file.

## Inspiration
Non-visual learners are limited when it comes to online learning resources. Retain provides a platform that allows them to train their retention power, prepare for exams, and get ahead of coursework.

## What it does
Students will submit a document that contains the material they want to be able to recollect. Retain will then record the students as they speak and using cosine similarity between the two, generate a final score of their performance.

## How we built it
We use Python's Tesseract, Sounddevice, and Speech Recognition libraries to convert different data streams (picture and audio) into a text document. For the converse facility, we utilized gTTS. Then using Google's Speech-to-Text API, we generate a transcript of the student's dialogue and compare that with the given reference text through SentenceTransformers.

## Challenges we ran into
The .wav, .mp3 and .mp4a files were finicky to work with, and it took us some time to figure out the appropriate API configurations for our audio files.

## Accomplishments that we're proud of
Conceptually, we are really happy that our project caters to a group of students that often seems to be left out of the dialogue regarding efficient learning methods. We also find the extensive usability and accessibility quite commendable. From a technical point of view, we are proud that we implemented coding practices centred around the principles of modularization and reusability to structure our project.

## What we learned
We picked up on different forms of text similarity, various measures within semantic similarity and the ways in which we could utilize each one. We also learned a lot about how voice recording and synthesis can be integrated into Python applications.

## What's next for Retain
We are hoping that Retain will eventually expand to being able to take in audios and texts in multiple languages and further include features such as an interactive Q&A and summarization.
