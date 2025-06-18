import fs from 'node:fs';

const token = process.env.GH_TOKEN;
const url = new URL('../static/data.json', import.meta.url);
const headers = { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` };
const response = await fetch(`https://api.github.com/user`, { headers });
const result = await response.text();

fs.open(url.pathname, 'w', (error, descriptor) => {
	if (error) {
		throw new Error('Failed to open file', { cause: error });
	}

	fs.write(descriptor, result, (error) => {
		if (error) {
			throw new Error('Failed to write file', { cause: error });
		}

		fs.close(descriptor, (error) => {
			if (error) {
				throw new Error('Failed to close file', { cause: error });
			}
		});
	});
});
