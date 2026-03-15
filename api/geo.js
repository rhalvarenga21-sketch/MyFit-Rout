module.exports = (req, res) => {
    const country = req.headers['x-vercel-ip-country'] || 'UNKNOWN';
    const city = req.headers['x-vercel-ip-city'] || '';
    const region = req.headers['x-vercel-ip-country-region'] || '';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');

    res.status(200).json({
        country,
        city: decodeURIComponent(city),
        region,
        source: 'vercel-headers'
    });
};