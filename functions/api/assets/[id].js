// 删除素材（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestDelete(context) {
    const { env } = context;
    const id = context.params.id;

    try {
        await env.DB.prepare('DELETE FROM assets WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true });
    } catch (error) {
        console.error('Delete asset error:', error);
        return jsonResponse({ error: '删除素材失败，请稍后再试' }, 500);
    }
}
