import { readFile, writeFile } from 'node:fs/promises';

const owner = process.env.SNAPSHOT_OWNER || 'liguozheng-ac';
if (!/^[a-zA-Z0-9-]+$/.test(owner)) throw new Error('Invalid GitHub username');
const timeZone = 'Asia/Shanghai';
const dateParts = (value) => Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
  timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
}).formatToParts(value).map(({ type, value }) => [type, value]));
const dayOf = (value) => {
  const parts = dateParts(value);
  return `${parts.year}-${parts.month}-${parts.day}`;
};
const today = dayOf(new Date());
const snapshotPath = `snapshots/${today.slice(0, 4)}/${today.slice(5, 7)}/${today}.json`;
const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
if (snapshot.owner !== owner || snapshot.date !== today) throw new Error('Snapshot owner or date mismatch');
const capturedAt = new Date(snapshot.captured_at);
if (!Number.isFinite(capturedAt.getTime())) throw new Error('Invalid snapshot timestamp');
const capturedParts = dateParts(capturedAt);
const selectedProjects = [
  ['j-gamelqa', 'J-GameLQA'],
  ['j-speechops', 'J-SpeechOps'],
  ['japanese-speech-xray', 'Japanese Speech X-Ray'],
];
function activityContent(copy) {
  const rows = selectedProjects.map(([name, label]) => {
    const repo = snapshot.repositories.find(repo => repo.repository === `${owner}/${name}`);
    if (!repo) return `| [${label}](https://github.com/${owner}/${name}) | ${copy.missing} | — |`;
    const commit = repo.latest_commit;
    if (!commit) return `| [${label}](https://github.com/${owner}/${name}) | ${copy.empty} | — |`;
    if (!/^[0-9a-f]{40}$/.test(commit.sha)) throw new Error('Invalid commit SHA');
    const committedAt = new Date(commit.committed_at);
    if (!Number.isFinite(committedAt.getTime())) throw new Error('Invalid commit timestamp');
    return `| [${label}](https://github.com/${owner}/${name}) | ${dayOf(committedAt)} | [\`${commit.sha.slice(0, 7)}\`](https://github.com/${owner}/${name}/commit/${commit.sha}) |`;
  });
  return [
    `${copy.captured} **${dayOf(capturedAt)} ${capturedParts.hour}:${capturedParts.minute}** (Asia/Shanghai).`,
    '',
    copy.tableHeader,
    '| --- | --- | --- |',
    ...rows,
    '',
    `[${copy.details}](https://github.com/${owner}/${owner}/blob/main/${snapshotPath}) · [${copy.archive}](https://github.com/${owner}/${owner}/tree/main/snapshots)`,
  ].join('\n');
}
const languages = [
  {
    path: 'README.md',
    missing: 'Not in this snapshot', empty: 'No commit recorded', captured: 'Snapshot captured',
    tableHeader: '| Project | Latest commit date | Commit |',
    details: 'Snapshot details', archive: 'Snapshot archive',
  },
  {
    path: 'README.zh-CN.md',
    missing: '本次快照未收录', empty: '暂无提交记录', captured: '快照采集时间',
    tableHeader: '| 项目 | 最近提交日期 | 提交记录 |',
    details: '快照详情', archive: '快照归档',
  },
];
const start = '<!-- PROJECT-ACTIVITY:START -->';
const end = '<!-- PROJECT-ACTIVITY:END -->';
const updates = [];
for (const language of languages) {
  const readmePath = language.path;
  const readme = await readFile(readmePath, 'utf8');
  if (readme.split(start).length !== 2 || readme.split(end).length !== 2 || readme.indexOf(start) > readme.indexOf(end)) {
    throw new Error(`${readmePath} must contain exactly one ordered pair of activity markers`);
  }
  const updated = readme.slice(0, readme.indexOf(start) + start.length)
    + '\n' + activityContent(language) + '\n'
    + readme.slice(readme.indexOf(end));
  updates.push({ path: readmePath, content: updated, changed: updated !== readme });
}
for (const update of updates) {
  if (update.changed) {
    await writeFile(update.path, update.content);
    console.log(`Updated ${update.path} project activity from ${snapshotPath}`);
  } else {
    console.log(`${update.path} project activity is already current.`);
  }
}
