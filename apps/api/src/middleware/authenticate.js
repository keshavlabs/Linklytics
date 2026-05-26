export async function authenticate(req, reply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply
      .code(401)
      .send({ error: "Unauthorized", message: "Invalid or expired token" });
  }
}
