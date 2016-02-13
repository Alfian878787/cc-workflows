/**
Redirects the user to the resulting `url` key
**/
export default function renderUrl(result, req, res) {
    res.redirect(302, result.url);
}
