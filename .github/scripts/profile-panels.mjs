import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const login = 'AC-Storm-YT';
function query(document, variables) {
  const response = execFileSync('gh', ['api', 'graphql', '--input', '-'], {
    input: JSON.stringify({ query: document, variables: { login, ...variables } }),
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024
  });
  return JSON.parse(response).data.user;
}

const { contributionsCollection: activity } = query(`
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions totalIssueContributions totalPullRequestContributions
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date weekday contributionCount contributionLevel } }
        }
      }
    }
  }`);
const repos = [];
let cursor = null;
do {
  const { repositories } = query(`
    query ($login: String!, $cursor: String) {
      user(login: $login) {
        repositories(first: 50, after: $cursor, privacy: PUBLIC, ownerAffiliations: OWNER) {
          nodes {
            isFork stargazerCount
            languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
              totalSize edges { size node { name } }
            }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    }`, { cursor });
  repos.push(...repositories.nodes);
  cursor = repositories.pageInfo.hasNextPage ? repositories.pageInfo.endCursor : null;
} while (cursor);

const calendar = activity.contributionCalendar;
const weeks = calendar.weeks;
const days = weeks.flatMap(week => week.contributionDays);
const fmt = number => number.toLocaleString('en-US');
const dateLabel = (date, options) => new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', ...options });
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const palette = ['#efa775', '#a5cfac', '#79aeb1', '#d0bf85', '#b49bbf', '#86978f'];
const levels = { NONE: '#283d33', FIRST_QUARTILE: '#4a6753', SECOND_QUARTILE: '#779473', THIRD_QUARTILE: '#c29b70', FOURTH_QUARTILE: '#ffc18c' };

function label(x, y, value, style = 'small', align = 'start') {
  return `<text x="${x}" y="${y}" class="${style}" text-anchor="${align}">${escape(value)}</text>`;
}
function rect(x, y, width, height, color) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${color}"/>`;
}
function panel(heading, subhead, height, body, description) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="${height}" viewBox="0 0 840 ${height}" role="img" aria-labelledby="title desc">
<title id="title">${escape(heading)}</title><desc id="desc">${escape(description)}</desc>
<style>
text{font-family:Consolas,'Liberation Mono',monospace;fill:#f4eedb}
.heading{font-size:25px;font-weight:700}.small{font-size:15px;fill:#b4c8b7}
.metric{font-size:33px;font-weight:700}.name{font-size:18px}.note{font-size:13px;fill:#b4c8b7}
@media(prefers-reduced-motion:no-preference){.draw{animation:appear .55s ease-out backwards}@keyframes appear{from{opacity:.35}to{opacity:1}}}
</style>
<rect width="840" height="${height}" rx="12" fill="#101c18"/>
<path d="M0 47h10l10-10V22h9" fill="none" stroke="#ae7956" stroke-width="2"/><circle cx="31" cy="22" r="2.5" fill="#efa775"/>
${label(43,40,heading,'heading')}${label(812,38,subhead,'small','end')}
${body.join('\n')}
</svg>\n`;
}

const metrics = [
  ['Contributions', calendar.totalContributions], ['Commits', activity.totalCommitContributions],
  ['Pull requests', activity.totalPullRequestContributions], ['Issues opened', activity.totalIssueContributions],
  ['Public repos', repos.length], ['Stars received', repos.reduce((sum, repo) => sum + repo.stargazerCount, 0)]
];
const statsBody = [];
metrics.forEach(([name, value], index) => {
  const x = 33 + (index % 3) * 271;
  const y = 95 + Math.floor(index / 3) * 74;
  statsBody.push(rect(x, y - 28, 3, 48, index < 4 ? '#9e6948' : '#658b74'),
    label(x + 13, y, fmt(value), 'metric'), label(x + 13, y + 20, name));
});
const stats = panel('GitHub stats', 'Activity over the last year', 234, [
  ...statsBody, label(33,215,'Public repositories and stars are current totals.','note')
], metrics.map(([name, value]) => name + ' ' + fmt(value)).join(', '));

const heatBody = [];
const left = 48;
const pitch = Math.min(14.4, (808 - left) / weeks.length);
const size = Math.min(11.8, pitch - 2);
let lastMonthLabel = -10;
for (const [index, week] of weeks.entries()) {
  const x = Number((left + index * pitch).toFixed(2));
  const first = week.contributionDays.find(day => day.date.endsWith('-01'));
  if (first && index - lastMonthLabel >= 3 && x < 796) {
    heatBody.push(label(x, 76, dateLabel(first.date, {month:'short'}), 'note'));
    lastMonthLabel = index;
  }
  const cells = week.contributionDays.map(day => {
    const y = 88 + day.weekday * 14;
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="2" fill="${levels[day.contributionLevel]}"><title>${day.date} · ${day.contributionCount}</title></rect>`;
  });
  heatBody.push(`<g class="draw" style="animation-delay:${index * 7}ms">${cells.join('')}</g>`);
}
const activeDays = days.filter(day => day.contributionCount > 0).length;
let streak = 0, longest = 0;
for (const day of days) {
  streak = day.contributionCount ? streak + 1 : 0;
  longest = Math.max(longest, streak);
}
const range = days.map(day => day.date);
const period = date => dateLabel(date, {month:'short', year:'numeric'});
heatBody.push(label(19,112,'M','note'), label(19,140,'W','note'), label(19,168,'F','note'),
  label(31,214,`${fmt(activeDays)} active days · Longest run: ${longest} days`),
  label(650,214,'Less','note','end'), label(808,214,'More','note','end'));
Object.values(levels).forEach((color, index) => heatBody.push(rect(660 + index * 19, 202, 14, 14, color)));
const heatmap = panel('Contributions', period(range[0]) + ' – ' + period(range.at(-1)), 234, heatBody,
  `${fmt(calendar.totalContributions)} contributions on ${activeDays} days over the last year.`);

const bytes = new Map();
let total = 0;
for (const repo of repos.filter(repo => !repo.isFork)) {
  total += repo.languages.totalSize;
  for (const { size, node } of repo.languages.edges) bytes.set(node.name, (bytes.get(node.name) ?? 0) + size);
}
const ranked = [...bytes.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const shown = ranked.slice(0, 5);
const remainder = total - shown.reduce((sum, [, size]) => sum + size, 0);
if (remainder > 0) shown.push(['Other', remainder]);
const langBody = [];
let offset = 31;
shown.forEach(([name, value], index) => {
  const share = value / total;
  const width = share * 778;
  langBody.push(rect(offset.toFixed(2), 65, width.toFixed(2), 13, palette[index]));
  offset += width;
  const x = 31 + (index % 2) * 402;
  const y = 112 + Math.floor(index / 2) * 33;
  langBody.push(rect(x, y-12, 10, 10, palette[index]), label(x + 20, y, name, 'name'),
    label(x + 372, y, (share * 100).toFixed(1) + '%', 'name', 'end'));
});
if (!shown.length) langBody.push(label(31,100,'No classified code in public repositories yet.'));
const languages = panel('Languages', 'Public, non-fork repositories', 230,
  [...langBody, label(31,210,'Share of code bytes reported by GitHub Linguist.','note')],
  shown.map(([name, size]) => name + ' ' + (size / total * 100).toFixed(1) + '%').join(', ') || 'No classified code.');

for (const [name, svg] of Object.entries({ stats, contributions: heatmap, languages })) {
  writeFileSync(new URL('../../assets/' + name + '.svg', import.meta.url), svg);
}
