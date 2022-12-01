# propaedeutic-reflection

A system for rating oneself against their peers anonymously.

Performance review systems are often rife with issues, from cognitive biases, to politics and power dynamics. None of us want to seem like we're lacking, especially when a "bad" performance review is perceived as a threat to our job and livelihood. We may even be too afraid to ask for help for how that may reflect on our capabilities.

This system is meant to provide a means of controlling for those concerns so people can gain a better understanding of where they stand amongst their peers and where they can start looking to improve themselves without fear.

This is based on an approach described in _Measuring and Managing Performance in Organizations_, by Robert D. Austin, which is a fantastic book on the problems with believing a person's individual performance can be assessed, and that action should be taken based on that assessment. I highly recommend reading it.

# How it works

The system is relatively simple. An individual rates themselves on a scale of 0-10 in a number of areas, and so do their peers. When everyone has finished rating themselves, the results are aggregated and averaged, then each person is shown only how they ranked themselves relative to the average. No one other than the person ranking themselves can see how they scored. In fact, no one other than the peers themselves can even see the averages (yes, that means the managers, VPs, et al).

People can be more honest with themselves about their confidence in certain areas since there's no one to impress, and no fear of consequences for not "performing" to a certain degree, but they still get the benefit of seeing where they stand amongst their peers. If someone sees they scored lower than everyone else in one area, sure, it might be a hit to the ego, but that feedback lets them know both what they can improve on, and where they can ask for help (if they're comfortable with that). If they see everyone scored low in a particular area, they'll likely feel more secure in their position, but also see an opporunity to help elevate the team.

People are then free to pursue improvements in those areas as they can, if they believe it's necessary.

# Why shouldn't management know how people are scoring?

A big part of this is [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law):

> When a measure becomes a target, it ceases to be a good measure.

If those with power gain this knowledge, it usually becomes a source of dysfunction (see: _Measuring and Managing Performance in Organizations_, by Robert D. Austin). People are more than a number on a spreadsheet, and having someone improve in low scoring areas won't necessarily improve productivity, let alone the bottom line. Focusing on getting the numbers up—especially when they are oversimplified proxies for measures of quality largely outside the control of the individual—is a recipe for problems.

# Aren't people biased? What if they score themselves higher than they should?

People are absolutely biased. But that bias goes both ways. And people are also often defensive and quick to point the finger at others. This approach at least helps resolve some of the bias by eliminating our desire to protect our ego from others.

## Testing locally

Make a github application and set the callback URL to `http://localhost:3000`. Then grab the ID and Secret and set them as the env vars `GITHUB_ID` and `GITHUB_SECRET` respectively. A `.env` file can be used that looks something like this:

```bash
SECRET='my-server-secret-123'
NEXTAUTH_URL='http://localhost:3000'
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=assessments
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/assessments?schema=public"
GITHUB_ID=MyGitHubAppId
GITHUB_SECRET=MyGitHubSecret
```

Then the app can be started by launching `docker compose up --build` and then `npm run dev`.

To run the tests, `npm run test` can be used to run all tests, while `npm run test:unit` can be used to run the tests that don't need a running database.
