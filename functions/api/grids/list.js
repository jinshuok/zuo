// 获取九宫格列表
import { verifyToken, jsonResponse } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { request, env } = context;
    
    try {
        const authHeader = request.headers.get('Authorization');
        let isAdmin = false;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const payload = await verifyToken(token, env.JWT_SECRET);
            if (payload) isAdmin = true;
        }
        
        let sql, stmt;
        if (isAdmin) {
            sql = `SELECT id, title, image_url, link_url, sort_order, active 
                   FROM grids 
                   ORDER BY sort_order ASC, id ASC`;
            stmt = env.DB.prepare(sql);
        } else {
            sql = `SELECT id, title, image_url, link_url, sort_order, active 
                   FROM grids 
                   WHERE active = 1 
                   ORDER BY sort_order ASC, id ASC`;
            stmt = env.DB.prepare(sql);
        }
        
        const { results } = await stmt.all();
        return jsonResponse({ success: true, grids: results || [] });
        
    } catch (error) {
        console.error('List grids error:', error);
        return jsonResponse({ error: 'Failed to fetch grids' }, 500);
    }
}
