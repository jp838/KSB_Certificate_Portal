module.exports = async function (context, req) {
    const payload = req.body || {};

    // Grab client metadata
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown IP';
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';

    // Log a custom trace to Application Insights
    context.log({
        eventName: "CertInstallAction",
        deviceOS: payload.os || "Unknown",
        actionType: payload.action || "Unknown",
        clientIp: clientIp,
        userAgent: userAgent,
        timestamp: payload.timestamp || new Date().toISOString()
    });

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "success" })
    };
};
