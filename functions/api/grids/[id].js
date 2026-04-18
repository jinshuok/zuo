// 更新/删除九宫格（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestPut(context) {
    const { request, env } = context;
    const id = context.params.id;
    
    try {
        const { title, image_url, link_url, sort_order, active } = await request.json();
        
        await env.DB.prepare(
            `UPDATE grids 
             SET title = ?, image_url = ?, link_url = ?, sort_order = ?, active = ?,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`
        ).bind(
            title,
            image_url,
            link_url || '',
            sort_order ?? 0,
            active ?? 1,
            id
        ).run();
        
        return jsonResponse({ success: true });
        
    } catch (error) {
        console.error('Update grid error:', error);
        return jsonResponse({ error: 'Failed to update grid' }, 500);
    }
}

export async function onRequestDelete(context) {
    const { env } = context;
    const id = context.params.id;
    
    try {
        await env.DB.prepare('DELETE FROM grids WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true });
        
    } catch (error) {
        console.error('Delete grid error:', error);
        return jsonResponse({ error: 'Failed to delete grid' }, 500);
    }
}
